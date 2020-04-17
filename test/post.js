// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let server = require('../app');

// DB & Models
let mongoose = require("mongoose");
let Post = require('../models/Post');

// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Posts', () => {
    // beforeEach
    before((done) => { 
        // Before each test we empty the database
        Post.deleteMany({}, (err) => { 
            done();
        });
    });

    /*
     * Test the /GET route
     */
    describe('/GET post', () => {
        it('it should GET all the posts', (done) => {
            chai.request(server)
                .get('/posts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST post', () => {
        it('it should POST a post with a title and a description', (done) => {
            let post = {
                title: "post_added_1",
                description: "this is the description field."
            }

            chai.request(server)
                .post('/posts')
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    done();
                });
        });
    });

    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id post', () => {
        it('it should GET a post by the given id', (done) => {
            let post = new Post({
                title: "post_added_by_getById", 
                description: "lalala"
            });

            post.save((err, post) => {
                chai.request(server)
                    .get('/posts/' + post.id)
                    .send(post)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('description');
                        res.body.should.have.property('date');
                        res.body.should.have.property('_id').eql(post.id);
                        done();
                    });
            });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id post', () => {
        it('it should DELETE a post given the id', (done) => {
            let post = new Post({
                title: "post_added_by_deleteById", 
                description: "lalala"
            });

            post.save((err, post) => {
                chai.request(server)
                .delete('/posts/' + post.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').eql(1);
                    res.body.should.have.property('n').eql(1);
                    done();
                });
            });
        });
    });
});
