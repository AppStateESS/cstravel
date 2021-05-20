'use strict'
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {defaultTrip, tripSettings, saveReady} from './TripDefaults'
import Host from './Host'
import Contact from './Contact'
import Submitter from './Submitter'
import Schedule from './Schedule'
import Message from '../Share/Message'
import {getTrip, postTrip, patchApproval} from './AJAX'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faToggleOn, faToggleOff} from '@fortawesome/free-solid-svg-icons'

const Form = ({
  allowInternational,
  contactBannerRequired,
  tripId,
  role,
  allowApproval,
}) => {
  const [Trip, setTrip] = useState(Object.assign({}, defaultTrip))
  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState(Object.assign({}, tripSettings.no))
  const [ready, setReady] = useState(Object.assign({}, tripSettings.no))

  const setFormElement = (key, value) => {
    //backup.setItem(key, value)
    Trip[key] = value
    setTrip(Object.assign({}, Trip))
  }

  const toggleApproval = (toggle) => {
    setFormElement('approved', toggle)
    if (Trip.id > 0) {
      patchApproval(toggle, Trip.id)
    }
  }

  const approvedIcon = () => {
    if (allowApproval === false) {
      return <span></span>
    }
    if (Trip.approved) {
      return (
        <div>
          <button
            onClick={() => toggleApproval(false)}
            className="btn btn-success">
            <FontAwesomeIcon icon={faToggleOn} /> Approved
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <button
            onClick={() => toggleApproval(true)}
            className="btn btn-danger">
            <FontAwesomeIcon icon={faToggleOff} /> Not approved
          </button>
        </div>
      )
    }
  }

  const errorCheck = (name) => {
    const emailMatch = (valueName) => {
      return Trip[valueName].match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/) === null
    }

    const phoneMatch = (valueName) => {
      return Trip[valueName].length < 7
    }

    let errorFound = false
    switch (name) {
      case 'contactPhone':
      case 'secContactPhone':
        errorFound = phoneMatch(name)
        break

      case 'contactEmail':
      case 'secContactEmail':
      case 'submitEmail':
        errorFound = emailMatch(name)
        break

      default:
        errorFound = Trip[name].length === 0
    }
    errors[name] = errorFound
    setErrors(Object.assign({}, errors))
    ready[name] = !errorFound
    setReady(Object.assign({}, ready))
  }

  useEffect(() => {
    // if role is member, we get an empty trip with Member information plugged in
    if (tripId > 0 || role === 'Member') {
      const promise = getTrip(tripId, role)
      promise.then((response) => {
        setTrip(response.data)
        setReady(Object.assign({}, tripSettings.yes))
      })
    }
  }, [tripId, role])

  let title
  if (Trip.id > 0) {
    title = <h3>Update trip</h3>
  } else {
    title = <h3>Create trip</h3>
  }

  const saveTrip = () => {
    const promise = postTrip(Trip, role)
    promise
      .then((response) => {
        //backup.clear()
        const url = `triptrack/${role}/Trip/${response.data.id}`
        location.href = url
      })
      .catch((error) => {
        console.log('Error:', error)
      })
  }

  //put in Submitter: backup={backup}
  return (
    <div>
      {title}
      <p>Please enter all requested, required information below:</p>
      <Message message={message} />
      {approvedIcon()}

      <a id="submitter-info"></a>
      <Submitter
        Trip={Trip}
        setFormElement={setFormElement}
        errorCheck={errorCheck}
        errors={errors}
        role={role}
      />
      <a id="host-info"></a>
      <Host
        Trip={Trip}
        setFormElement={setFormElement}
        allowInternational={allowInternational}
        errorCheck={errorCheck}
        errors={errors}
      />
      <a id="contact-info"></a>
      <Contact
        Trip={Trip}
        setFormElement={setFormElement}
        contactBannerRequired={contactBannerRequired}
        errorCheck={errorCheck}
        errors={errors}
      />
      <a id="schedule-info"></a>
      <Schedule Trip={Trip} setFormElement={setFormElement} />
      <div className="text-center">
        <button
          className="btn btn-success"
          onClick={saveTrip}
          disabled={!saveReady(ready)}>
          {saveReady(ready) ? 'Save and continue' : 'Fill in all fields above'}
        </button>
      </div>
    </div>
  )
}

Form.propTypes = {
  role: PropTypes.string,
  tripId: PropTypes.number,
  defaultState: PropTypes.string,
  defaultCountry: PropTypes.string,
  allowInternational: PropTypes.bool,
  contactBannerRequired: PropTypes.bool,
  allowApproval: PropTypes.bool,
}

export default Form
