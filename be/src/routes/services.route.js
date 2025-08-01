import express from 'express'
import { createService, deleteService, getSingleService,
     updateService, getRecommendedService, 
     getServicesByFilter, getServiceFilterCount } from '../controllers/serviceController.js' 

const router = express.Router()

router.post('/', createService)
router.put('/:id',updateService)
router.delete('/:id', deleteService)

router.get('/:id', getSingleService)
router.get('/recommended/getRecommendedService', getRecommendedService)
router.get('/search/getServiceByFilter', getServicesByFilter)
router.get('/search/getServiceFilterCount', getServiceFilterCount)

export default router