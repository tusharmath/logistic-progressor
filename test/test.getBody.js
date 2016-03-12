import test from 'ava'
import { TestScheduler, ReactiveTest } from 'rx'
import getBody from '../src/getBody'
const {onNext} = ReactiveTest

const testSubscriber = x => {
  const out = []
  x.subscribe(x => out.push(x))
  return out
}

test(t => {
  const sh = new TestScheduler()
  const sigmoid = x => x * 10
  const source = sh.createHotObservable(
    onNext(210, true),
    onNext(220, false)
  )
  const getAnimationFrames = () => sh.createHotObservable(
      onNext(205, 1),
      onNext(215, 2),
      onNext(225, 3)
  )
  const out = testSubscriber(getBody(source, sigmoid, getAnimationFrames))
  sh.start()
  t.same(out, [10, 20])
})
