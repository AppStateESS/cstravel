<?php

/**
 * @author Matthew McNaney <mcnaneym@appstate.edu>
 * @license https://opensource.org/licenses/MIT
 */

namespace triptrack\Controller\Member;

use triptrack\Controller\SubController;
use triptrack\Factory\TripFactory;
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

}
