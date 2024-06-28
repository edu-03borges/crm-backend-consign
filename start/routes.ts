
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

const InstanceController = () => import('../app/http/Financial/fgts/InstanceController.js');
const CampaignsController = () => import('../app/http/Financial/fgts/CampaignsController.js');
const AuthController = () => import('../app/http/Login/AuthController.js');

// ## Login
router.post('/register_user', [AuthController, 'register']).as('auth.register');
router.post('/authenticate_user', [AuthController, 'authenticate']).as('auth.authenticate');
router.delete('/logout_user', [AuthController, 'logout']).as('auth.logout').use(middleware.auth());
router.post('/me_user', [AuthController, 'me']).as('auth.me')

// ## Financial

// # fgts

// InstanceController
router.post('/financial/fgts/create_instance', [InstanceController, 'create']);
router.get('/financial/fgts/show_instances', [InstanceController, 'show']);
router.get('/financial/fgts/show_status_instances', [InstanceController, 'showStatus']);
router.delete('/financial/fgts/delete_instance/:uuid', [InstanceController, 'delete']);
router.post('/financial/fgts/update_status_instance/:uuid', [InstanceController, 'updateStatus']);

// CampaignsController
router.post('/financial/fgts/create_campaign', [CampaignsController, 'create']);
router.get('/financial/fgts/show_campaigns', [CampaignsController, 'show']);
router.get('/financial/fgts/search_data/:uuid', [CampaignsController, 'searchData']);
router.delete('/financial/fgts/delete_campaign/:uuid', [CampaignsController, 'delete']);
