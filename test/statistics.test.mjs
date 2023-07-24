import { Statistics } from '../lib/v1/statistics.mjs';

describe('Statistics', () => {

   test('Timer captures reasonable duration', async () => {
      const timer = new Statistics('test-operation');

      timer.start();
      await new Promise(resolve => setTimeout(resolve, 100));
      timer.stop();

      expect(timer.duration).toBeGreaterThan(99);
      expect(timer.duration).toBeLessThan(150);
   });

   test('Timer captures reasonable duration 2', async () => {
      const timer = new Statistics('test-operation');
      
      timer.start();
      await new Promise(resolve => setTimeout(resolve, 20));
      timer.stop();

      expect(timer.duration).toBeGreaterThan(19);
      expect(timer.duration).toBeLessThan(50);
   });

   test('Timer creates a log message', async () => {
      Statistics.purge();

      const timer1 = new Statistics('test-operation');

      timer1.start();
      await new Promise(resolve => setTimeout(resolve, 20));
      timer1.stop();

      const timer2 = new Statistics('another-operation');

      timer2.start();
      await new Promise(resolve => setTimeout(resolve, 20));
      timer2.stop();
   });
});