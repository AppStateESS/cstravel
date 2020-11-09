'use strict'
import React, {useState} from 'react'
import PropTypes from 'prop-types'

const MemberForm = ({member, update, close, save}) => {
  return (
    <div className="container">
      <h3 className="border-bottom pb-2 mb-3">
        {member.id > 0 ? 'Update' : 'Add'} member
      </h3>
      <div className="row mb-3 form-group">
        <div className="col-6">
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={member.firstName}
            onChange={(e) => update('firstName', e.target.value)}
          />
        </div>
        <div className="col-6">
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={member.lastName}
            onChange={(e) => update('lastName', e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={member.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>
        <div className="col-6">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={member.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={member.username}
            onChange={(e) => update('username', e.target.value)}
          />
        </div>
        <div className="col-6">
          <label>Banner ID</label>
          <input
            type="text"
            name="bannerId"
            className="form-control"
            value={member.bannerId}
            onChange={(e) => update('bannerId', e.target.value)}
          />
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary mr-2" onClick={save}>
          Save
        </button>
        <button className="btn btn-danger" onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  )
}

MemberForm.propTypes = {
  member: PropTypes.object,
  update: PropTypes.func,
  save: PropTypes.func,
  close: PropTypes.func,
}

export default MemberForm