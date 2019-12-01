import { ReverseOrderPipe } from './reverse-order.pipe';

describe('InverseOrderPipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseOrderPipe();
    expect(pipe).toBeTruthy();
  });
});
