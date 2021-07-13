import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import ActivityDao from '@daos/Activity/ActivityDao';
import { paramMissingError } from '@shared/constants';

const activityDao = new ActivityDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

import validateRequests from '@middlewares/validateRequest';
const validateRequest = new validateRequests();

import express from 'express';
let activityRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - emoji
 *         - tags
 *         - startdate
 *         - enddate
 *         - title
 *         - description
 *         - likes
 *         - media
 *       properties:
 *         id:
 *           type: string
 *           description: uuid of the activity
 *         emoji:
 *           type: string
 *           description: emoji selected by the user
 *         tags:
 *           type: array
 *           description: array containing tags
 *         startdate:
 *           type: string
 *           description: start date of the activity
 *         enddate:
 *           type: string
 *           description: end date of the activity
 *         likes:
 *           type: array
 *           description: array containing user id of users who liked the activity
 *         media:
 *           type: array
 *           description: array containing links of media for the activity
 *       example:
 *         id: activityid
 *         emoji: ':thumbsup:'
 *         tags: ['ReactJS', 'node', 'graphql']
 *         startdate: ''
 *         enddate: ''
 *         title: 'An interesting title'
 *         description: 'A discription'
 *         likes: ['']
 *         media: ['']
 */

/**
 * @swagger
 * tags:
 *   name: Activity
 */

/**
 * @swagger
 * /api/activity/user/{username}/activityid/{activityid}:
 *   get:
 *     summary: Get the activity by username and activityid
 *     tags: [Activity]
 *     parameters:
 *       - name: username
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's unique username
 *       - name: activityid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity id
 *     responses:
 *       200:
 *         description: The activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: not found
 */

// Get one activity.

activityRouter.get(
    '/user/:username/activityid/:id',
    async function (req: Request, res: Response) {
        const { username, id } = req.params;
        const activity = await activityDao.getOne(username, id);
        return res.status(OK).json({ activity });
    }
);

/**
 * @swagger
 * /api/activity:
 *   post:
 *     summary: Inserts an activity
 *     tags: [Activity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               activity:
 *                 $ref: '#/components/schemas/Activity'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */

// Insert one activity.
activityRouter.post(
    '/',
    // validateRequest.isActivity,
    async function (req: Request, res: Response) {
        const { username, activity } = req.body;

        await activityDao.add(username, activity);
        return res.status(CREATED).end();
    }
);

/**
 * @swagger
 * /api/activity:
 *   put:
 *     summary: Updates an activity
 *     tags: [Activity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               activity:
 *                 $ref: '#/components/schemas/Activity'
 *     responses:
 *       201:
 *         description: Updated
 *       400:
 *         description: Bad Request
 */

/**
 * Update one activity.
 *
 * @param req
 * @param res
 * @returns
 */
activityRouter.put(
    '/',
    // validateRequest.isActivity,
    async function (req: Request, res: Response) {
        const { username, activity } = req.body;

        await activityDao.update(username, activity);
        return res.status(OK).end();
    }
);

/**
 * @swagger
 * /api/activity/user/{username}/key/{activityid}:
 *   delete:
 *     summary: Delete the activity by username and id
 *     tags: [Activity]
 *     parameters:
 *       - name: username
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's unique username
 *       - name: activityid
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity id
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: The activity was not found
 */

/**
 * Delete one activity.
 *
 * @param req
 * @param res
 * @returns
 */
activityRouter.delete(
    '/user/:username/key/:key',
    async function (req: Request, res: Response) {
        const { username, key } = req.params;
        await activityDao.delete(username, key);
        return res.status(OK).end();
    }
);

export default activityRouter;
