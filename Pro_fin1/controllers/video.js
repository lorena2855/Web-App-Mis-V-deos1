
const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const pool = require('../database');


const controller = {};

controller.list = (req, res) => {
    pool.query('SELECT video.id,name, url, description, category, red_name, avg(votos)as voto  FROM video JOIN red_social ON  video.id_red=red_social.id_red LEFT JOIN voto ON video.id =voto.id_video  WHERE user_id = ? group by video.id  ORDER BY  created_at DESC  ', [req.user.id], (err, videos) => {
        if (err) {
            res.json(err);
        }
        res.render('videos/list', {
            data: videos
        });
    });
};
controller.save = async(req, res) => {
    const { name, url, description, category, id_red } = req.body;
    const newVideo = {
        name,
        url,
        description,
        category,
        id_red,
        user_id: req.user.id

    };
    pool.query('INSERT INTO video set ?', [newVideo], (err, video) => {
        req.flash('success', 'video Saved Successfully');
        pool.query("select url from video order by id desc limit 1", (err2, urlvideo) => {
            pool.query('SELECT * FROM red_social ', (err, red) => {

                if (err2) {
                    res.json(err2);
                }
                res.render('videos/add', {
                    link: urlvideo[0],
                    red: red
                });
            });

        });
    })
};

controller.edit = async(req, res) => {
    const { id } = req.params;
    pool.query("SELECT * FROM video WHERE id = ?", [id], (err, rows) => {
        pool.query('SELECT * FROM red_social ', (err, red) => {
            res.render('videos/edit', {
                data: rows[0],
                red: red
            })
        });
    });
};

controller.update = async(req, res) => {
    const { id } = req.params;
    const { name, url, description, category, id_red } = req.body;
    const newVideo = {
        name,
        url,
        description,
        category,
        id_red,
        user_id: req.user.id
    };
    pool.query('UPDATE video set ?  WHERE id = ?', [newVideo, id], (err, rows) => {
        req.flash('success', 'Video Updated Successfully');
        res.redirect('/videos');
    });
};

controller.delete = async(req, res) => {
    const { id } = req.params;
    pool.query('DELETE  FROM voto WHERE id_video= ?', [id], (err, rows1) => {
        pool.query('DELETE FROM video WHERE id = ?', [id], (err, rows) => {
            req.flash('success', 'Video Removed Successfully');
            res.redirect('/videos');
        });
    });
}

controller.list_api = (req, res) => {
    pool.query('SELECT video.id,name, url, description, category, red_name, avg(votos)as voto  FROM video JOIN red_social ON  video.id_red=red_social.id_red LEFT JOIN voto ON video.id =voto.id_video  WHERE user_id = ? group by video.id  ORDER BY  created_at DESC  ', [req.user.id], (err, videos) => {
        if (err) {
            res.json(err);
        }
        res.json({
            data: videos
        });
    });
};

controller.save_api = async(req, res) => {
    const { name, url, description, category, id_red } = req.body;
    const newVideo = {
        name,
        url,
        description,
        category,
        id_red,
        user_id: req.user.id

    };
    pool.query('INSERT INTO video set ?', [newVideo], (err, video) => {
        pool.query("select url from video order by id desc limit 1", (err2, urlvideo) => {
            pool.query('SELECT * FROM red_social ', (err, red) => {

                if (err) {
                    res.json(err);
                }
                res.json({
                    link: urlvideo[0],
                    red: red
                });
            });

        });
    })
};

controller.edit_api = async(req, res) => {
    const { id } = req.params;
    pool.query("SELECT * FROM video WHERE id = ?", [id], (err, rows) => {
        pool.query('SELECT * FROM red_social ', (err, red) => {
            if (err) {
                res.json(err);
            }
            res.json({
                data: rows[0],
                red: red
            })
        });
    });
};

controller.update_api = async(req, res) => {
    const { id } = req.params;
    const { name, url, description, category, id_red } = req.body;
    const newVideo = {
        name,
        url,
        description,
        category,
        id_red,
        user_id: req.user.id
    };
    pool.query('UPDATE video set ?  WHERE id = ?', [newVideo, id], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.json({ status: 'Video Updated' });

    });
};

controller.delete_api = async(req, res) => {
    const { id } = req.params;
    pool.query('DELETE  FROM voto WHERE id_video= ?', [id], (err, rows1) => {
        pool.query('DELETE FROM video WHERE id = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            }

            res.json({ status: 'Video Deleted' });

        });
    });
}
module.exports = controller;