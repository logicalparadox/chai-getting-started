var chai = require('chai');

var should = chai.should();

describe('hello universe', function () {

  it('should be string', function () {
    var str = 'hello universe';
    str.should.be.a('string');
  });

  it('can check an array', function () {
    var arr = [ 'a', 'b', 'c' ];
    arr.should.include('a');
    arr.should.not.include('d');
  });

  it('can chain assertions', function () {
    var obj = {
      hello: 'universe',
      world: {
        valid: true,
        arr: [ 'a', 'b', 'c' ]
      }
    }

    obj.should.have.property('hello', 'universe');
    obj.should.have.property('world')
      .to.deep.equal({ valid: true, arr: [ 'a', 'b', 'c' ] });

    obj.should.have.deep.property('world.valid', true);
    obj.should.have.deep.property('world.arr[2]', 'c');
  });

});
