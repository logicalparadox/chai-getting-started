var chai = require('chai')
  , chaiSpies = require('chai-spies')
  , chaiHttp = require('chai-http')
  , should = chai.should()
  , request = require('superagent');

chai.use(chaiSpies);
chai.use(chaiHttp);

var EE = require('events').EventEmitter;

describe('getting started', function () {

  it('can do type tests', function () {
    ([]).should.be.an('array');
    ({}).should.be.an('object');
    (42).should.be.a('number');
    ('hello universe').should.be.a('string');
    (function () {}).should.be.a('function');
    (true).should.be.a('boolean').and.true;
    (false).should.be.a('boolean').and.false;
    ([]).should.be.an.instanceof(Array);

    should.not.exist(null);
    should.not.exist(undefined);
  });

  it('can detect thrown errors', function () {
    function badFn (arg) {
      if (arg) {
        throw new ReferenceError('bad function at 4am');
      }
    }

    (function () {
      badFn(true);
    }).should.throw();
    //badFn.should.throw();
    //badFn.should.throw(ReferenceError);
    //badFn.should.throw(/4am/);
    //badFn.should.not.throw(/3am/);
    //badFn.should.throw(ReferenceError, 'bad function at 4am');
  });

  it('can use plugins', function () {
    var spy = chai.spy(function (err, where) {
      should.not.exist(err);
      where.should.equal('universe');
    });

    var ee = new EE();

    ee.on('hello', spy);
    ee.emit('hello', null, 'universe');

    spy.should.have.been.called.once;
    spy.should.have.been.called.exactly(1);
    spy.should.have.been.called();
  });

  it('can do an async request', function (done) {
    request.get('http://google.com')
      .end(function (res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

});
