<?php

/**
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license https://opensource.org/licenses/MIT
 */

namespace triptrack\Controller\Member;

use triptrack\Controller\SubController;
use triptrack\Factory\TripFactory;
use triptrack\Factory\SettingFactory;
use Canopy\Request;

class Trip extends SubController
{

    protected $view;

    public function __construct(\triptrack\Role\Base $role)
    {
        parent::__construct($role);
        $this->view = new \triptrack\View\TripView();
    }

    public function createHtml()
    {
        return $this->view->memberForm();
    }

    public function viewJson(Request $request)
    {
        if ((int) $this->id === 0) {
            $trip = TripFactory::loadNewMemberTrip();
        } else {
            $trip = TripFactory::load(TripFactory::build(), $this->id);
            if ($trip->submitUsername != \Current_User::getUsername()) {
                throw new \Exception('Member is not trip submitter');
            }
        }
        return $trip->getVariablesAsValue(false, null, true);
    }

    public function viewHtml(Request $request)
    {
        $trip = TripFactory::build($this->id, false);
        if (empty($trip)) {
            header("HTTP/1.0 404 Not Found");
            return '<div>The trip you requested does not exist.</div>';
        }

        return $this->view->memberView($trip);
    }

    public function listHtml()
    {
        return $this->view->memberList();
    }

    public function post(Request $request)
    {
        $trip = TripFactory::post($request, SettingFactory::getApprovalRequired());
        $errorFree = TripFactory::errorCheck($trip);

        if ($errorFree === true) {
            $trip = TripFactory::save($trip);
            \triptrack\Factory\MemberFactory::addToTrip($this->role->memberId, $trip->id);
            return ['success' => true, 'id' => $trip->id];
        } else {
            return ['success' => false, 'errors' => $errorFree];
        }
    }

}
