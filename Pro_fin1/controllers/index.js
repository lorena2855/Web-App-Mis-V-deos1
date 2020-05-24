const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

const controller = {};

controller.listIndex = async(req, res) => {
    pool.query('SELECT video.id, url, avg(votos) as voto FROM video INNER JOIN voto ON voto.id_video=video.id  group by video.id  having voto >= 4 ORDER BY  created_at DESC', (err, fav, fields) => {
        pool.query('SELECT video.id,name, url, description, category, username,red_name, avg(votos)as voto ,users.id as user_id FROM video  INNER JOIN users ON video.user_id = users.id   LEFT JOIN voto ON video.id =voto.id_video JOIN red_social ON  video.id_red=red_social.id_red group by video.id ORDER BY  created_at DESC ', (err, videos) => {

            if (err) { res.json(err); }
            res.render('index', {
                data: videos,
                fav: fav
            });
        });
    });
};
controller.list = async(req, res) => {
    pool.query('SELECT video.id, url, avg(votos) as voto FROM video INNER JOIN voto ON voto.id_video=video.id  group by video.id  having voto >= 4 ORDER BY  created_at DESC', (err, fav, fields) => {
        pool.query('SELECT video.id,name, url, description, category, username,red_name, avg(votos)as voto ,users.id as user_id FROM video  INNER JOIN users ON video.user_id = users.id   LEFT JOIN voto ON video.id =voto.id_video JOIN red_social ON  video.id_red=red_social.id_red group by video.id ORDER BY  created_at DESC ', (err, videos, fields) => {
            if (err) { res.json(err); }
            res.json({
                data: videos,
                fav: fav
            });

        });
    });
};



controller.detail = (req, res) => {
    const { id } = req.params;
    const { votos } = req.body;
    const newVoto = {
        id_video: id,
        votos
    };
    console.log(newVoto);
    pool.query("SELECT  video.id as video_id,name, url, description, category, username, users.id , red_name FROM video INNER JOIN users ON video.user_id = users.id JOIN red_social ON  video.id_red=red_social.id_red WHERE video.id = ?", [id], (err, rows) => {
        pool.query('INSERT INTO voto set ?', [newVoto], (err, voto) => {
            pool.query("SELECT avg(votos) as prom  FROM voto   WHERE id_video = ?", [id], (err, prom) => {
                console.log(prom);
                res.render('videos/detail', {
                    data: rows[0],
                    prom: prom
                })
            })
        })
    });
};

controller.detail_post = (req, res) => {
    const { id } = req.params;
    const { votos } = req.body;
    const newVoto = {
        id_video: id,
        votos
    };
    console.log(newVoto);
    pool.query("SELECT  video.id as video_id,name, url, description, category, username, users.id , red_name FROM video INNER JOIN users ON video.user_id = users.id JOIN red_social ON  video.id_red=red_social.id_red WHERE video.id = ?", [id], (err, rows) => {
        pool.query('INSERT INTO voto set ?', [newVoto], (err, voto) => {

            pool.query("SELECT avg(votos) as prom  FROM voto   WHERE id_video = ?", [id], (err, prom) => {

                pool.query("SELECT votos as prom  FROM voto  order by id_video desc limit 1 ", (err, prom) => {
                    console.log(prom);
                    res.render('videos/detail', {
                        data: rows[0],
                        prom: prom
                    })
                })
            })
        })
    });
};

controller.details = async(req, res) => {
    const { id } = req.params;
    const { votos } = req.body;
    const newVoto = {
        id_video: id,
        votos
    };
    console.log(newVoto);
    pool.query("SELECT  video.id as video_id,name, url, description, category, username, users.id , red_name FROM video INNER JOIN users ON video.user_id = users.id JOIN red_social ON  video.id_red=red_social.id_red WHERE video.id = ?", [id], (err, rows) => {
        pool.query("SELECT avg(votos) as prom  FROM voto   WHERE id_video = ?", [id], (err, prom) => {
            console.log(prom);
            pool.query('INSERT INTO voto set ?', [newVoto], (err, voto) => {
                if (!err) {
                    res.json({
                        status: 'Voto saved',
                        data: rows[0],
                        prom: prom
                    });
                } else {
                    console.log(err);
                }
            })
        })
    });
};

module.exports = controller;