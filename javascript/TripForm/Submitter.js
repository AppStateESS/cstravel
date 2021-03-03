'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Organizations from './Organizations'

const Submitter = ({
  Trip,
  setFormElement,
  errorCheck,
  backup,
  errors,
  role,
}) => {
  const invalid = 'form-control is-invalid'
  const valid = 'form-control'

  const submitName = () => {
    if (role === 'Member') {
      return <strong>{Trip.submitName}</strong>
    } else {
      return (
        <input
          type="text"
          name="submitName"
          className={errors.submitName ? invalid : valid}
          value={Trip.submitName}
          onBlur={() => errorCheck('submitName')}
          onChange={(e) => {
            setFormElement('submitName', e.target.value)
          }}
        />
      )
    }
  }

  const submitEmail = () => {
    if (role === 'Member') {
      return <strong>{Trip.submitEmail}</strong>
    } else {
      return (
        <input
          type="text"
          name="submitEmail"
          className={errors.submitEmail ? invalid : valid}
          value={Trip.submitEmail}
          onBlur={() => errorCheck('submitEmail')}
          onChange={(e) => {
            setFormElement('submitEmail', e.target.value)
          }}
        />
      )
    }
  }

  return (
    <fieldset>
      <legend className="border-bottom mb-3">Submitter information</legend>
      <Organizations Trip={Trip} setFormElement={setFormElement} role={role} />
      <div className="row form-group">
        <div className="col-sm-4">Your name</div>
        <div className="col-sm-8">
          {submitName()}
          {errors.submitName ? (
            <div className="invalid-feedback">Please provide a valid name.</div>
          ) : null}
        </div>
      </div>
      <div className="row form-group">
        <div className="col-sm-4">Your email</div>
        <div className="col-sm-8">
          {submitEmail()}

          {errors.submitEmail ? (
            <div className="invalid-feedback">
              Please provide a valid email address.
            </div>
          ) : null}
        </div>
      </div>
    </fieldset>
  )
}

Submitter.propTypes = {
  Trip: PropTypes.object,
  setFormElement: PropTypes.func,
  errorCheck: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
}

export default Submitter
