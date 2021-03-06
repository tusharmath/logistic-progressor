import test from 'ava'
import { TestScheduler } from 'rx'
import { orig } from 'funjector'
const getAnimationFrames = orig(require('../index').getAnimationFrames)

const testSubscriber = x => {
  const out = []
  x.subscribe(x => out.push(x))
  return out
}

test(t => {
  const sh = new TestScheduler()
  const out = testSubscriber(getAnimationFrames(sh).take(5))
  sh.start()
  t.same(out, [0, 1, 2, 3, 4])
})
