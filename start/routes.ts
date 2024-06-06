
import router from '@adonisjs/core/services/router';
const InstanceController = () => import('../app/http/Financial/fgts/InstanceController.js');
const CampaignsController = () => import('../app/http/Financial/fgts/CampaignsController.js');

// ## Financial

// # fgts

// InstanceController
router.post('/financial/fgts/create_instance', [InstanceController, 'create']);
router.get('/financial/fgts/show_instances', [InstanceController, 'show']);

// CampaignsController
router.post('/financial/fgts/create_campaign', [CampaignsController, 'create']);
router.get('/financial/fgts/show_campaigns', [CampaignsController, 'show']);
router.get('/financial/fgts/download_files/:uuid', [CampaignsController, 'downloadFiles']);