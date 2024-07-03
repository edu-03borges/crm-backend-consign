
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

const InstanceController = () => import('../app/http/Tools/fgtsSimulationAutomation/InstanceController.js');
const CampaignsController = () => import('../app/http/Tools/fgtsSimulationAutomation/CampaignsController.js');
const AuthController = () => import('../app/http/Login/AuthController.js');
const CompanyController = () => import('../app/http/Utils/CompanyController.js');
const LicenseController = () => import('../app/http/Utils/LicenseController.js');

router.get("/", () => {
  return {
    info: "crm-backend-consign",
    versao: "v1.0.0",
    lastUpdate: "2024-07-01",
  };
});

// AuthController
router.post('/register_user', [AuthController, 'register']).as('auth.register');
router.post('/authenticate_user', [AuthController, 'authenticate']).as('auth.authenticate');
router.delete('/logout_user', [AuthController, 'logout']).as('auth.logout').use([middleware.auth(), middleware.license()]);;
router.post('/me_user', [AuthController, 'me']).as('auth.me')

// CompanyController
router.get('/utils/get_public_url', [CompanyController, 'getPublicUrl']).use([middleware.auth(), middleware.license()]);;

// LicenseController
router.post('/utils/create_license', [LicenseController, 'create']);

// InstanceController
router.post('/tools/fgts_simulation_automation/create_instance', [InstanceController, 'create']).use([middleware.auth(), middleware.license()]);;
router.get('/tools/fgts_simulation_automation/show_instances', [InstanceController, 'show']).use([middleware.auth(), middleware.license()]);;
router.get('/tools/fgts_simulation_automation/show_status_instances', [InstanceController, 'showStatus']).use([middleware.auth(), middleware.license()]);;
router.delete('/tools/fgts_simulation_automation/delete_instance/:uuid', [InstanceController, 'delete']).use([middleware.auth(), middleware.license()]);;
router.post('/tools/fgts_simulation_automation/update_status_instance/:uuid', [InstanceController, 'updateStatus']).use([middleware.auth(), middleware.license()]);;

// CampaignsController
router.post('/tools/fgts_simulation_automation/create_campaign', [CampaignsController, 'create']).use([middleware.auth(), middleware.license()]);;
router.get('/tools/fgts_simulation_automation/show_campaigns', [CampaignsController, 'show']).use([middleware.auth(), middleware.license()]);;
router.get('/tools/fgts_simulation_automation/search_data/:uuid', [CampaignsController, 'searchData']).use([middleware.auth(), middleware.license()]);;
router.delete('/tools/fgts_simulation_automation/delete_campaign/:uuid', [CampaignsController, 'delete']).use([middleware.auth(), middleware.license()]);;
