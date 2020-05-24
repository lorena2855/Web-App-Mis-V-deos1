const express = require('express');
const router = express.Router();

const pool = require('../database');

const controller = {};


controller.list = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT video.id,name, url, description, category, red_name, avg(votos)as voto  FROM video JOIN red_social ON  video.id_red=red_social.id_red LEFT JOIN voto ON video.id =voto.id_video  WHERE user_id = ? group by video.id  ORDER BY  created_at DESC  ', [id], (err, videos) => {
        pool.query('  SELECT  username  FROM  users  WHERE id = ?', [id], (err, username) => {
            if (err) {
                res.json(err);
            }
            res.render('videos/user_videos', {
                data: videos,
                username: username[0]

            });

        });
    });
};

controller.list_users = async(req, res) => {
    pool.query("SELECT id, username from users ", (err, users) => {
        if (err) {
            res.json(err);
        }
        res.render('users', {
            data: users
        })
    });
};


controller.lists = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT video.id,name, url, description, category, red_name, avg(votos)as voto  FROM video JOIN red_social ON  video.id_red=red_social.id_red LEFT JOIN voto ON video.id =voto.id_video  WHERE user_id = ? group by video.id  ORDER BY  created_at DESC  ', [id], (err, videos) => {
        pool.query('  SELECT  username  FROM  users  WHERE id = ?', [id], (err, username) => {
            if (err) {
                res.json(err);
            }
            res.json({
                data: videos,
                username: username[0]

            });

        });
    });
};
controller.list_users_api = async(req, res) => {
    pool.query("SELECT id, username from users ", (err, users) => {
        if (err) {
            res.json(err);
        }
        res.json({
            data: users
        })
    });
};



module.exports = controller;