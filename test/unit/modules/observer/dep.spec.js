import Dep, {popTarget, pushTarget} from 'core/observer/dep'

describe('Dep', () => {
  let dep

  beforeEach(() => {
    dep = new Dep()
  })

  describe('instance', () => {
    it('should be created with correct properties', () => {
      expect(dep.subs.length).toBe(0)
      expect(new Dep().id).toBe(dep.id + 1)
    })
  })

  describe('addSub()', () => {
    it('should add sub', () => {
      dep.addSub(null)
      expect(dep.subs.length).toBe(1)
      expect(dep.subs[0]).toBe(null)
    })
  })

  describe('removeSub()', () => {
    it('should remove sub', () => {
      dep.subs.push(null)
      dep.removeSub(null)
      expect(dep.subs.length).toBe(0)
    })
  })

  describe('depend()', () => {
    it('should add itself to target', () => {
      const target = jasmine.createSpyObj('TARGET', ['addDep'])
      pushTarget(target)
      dep.depend()
      popTarget()
      expect(target.addDep).toHaveBeenCalledWith(dep)
    })
  })

  describe('notify()', () => {
    it('should notify subs', () => {
      dep.subs.push(jasmine.createSpyObj('SUB', ['update']))
      dep.notify()
      expect(dep.subs[0].update).toHaveBeenCalled()
    })
  })
})
