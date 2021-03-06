import test from 'ava'
import { TestScheduler, ReactiveTest } from 'rx'
import { orig } from 'funjector'
const getTail = orig(require('../index').getTail)
const {onNext} = ReactiveTest

const testSubscriber = x => {
  const out = []
  x.subscribe(x => out.push(x))
  return out
}

test(t => {
  const sh = new TestScheduler()
  const source = sh.createHotObservable(
    onNext(210, false)
  )
  const body = sh.createHotObservable(
    onNext(205, 96)
  )
  const animationFrames = sh.createHotObservable(
    onNext(220, 0),
    onNext(230, 1),
    onNext(240, 2),
    onNext(250, 3),
    onNext(260, 4),
    onNext(270, 5)
  )
  const getAnimationFrames = () => animationFrames
  const out = testSubscriber(getTail(getAnimationFrames, source, body, 2))
  sh.start()
  t.same(out, [97, 98, 100, 0])
})

test('body has floating value', t => {
  const sh = new TestScheduler()
  const source = sh.createHotObservable(
    onNext(210, false)
  )
  const body = sh.createHotObservable(
    onNext(205, 96.3)
  )
  const animationFrames = sh.createHotObservable(
    onNext(220, 0),
    onNext(230, 1),
    onNext(240, 2),
    onNext(250, 3),
    onNext(260, 4),
    onNext(270, 5)
  )
  const getAnimationFrames = () => animationFrames
  const out = testSubscriber(getTail(getAnimationFrames, source, body, 2))
  sh.start()
  t.same(out, [97.3, 98.3, 100, 0])
})
