import { isVideo } from './is-video';

describe('isVideo', () => {
  it('should work', () => {
    expect(isVideo()).toEqual('is-video');
  });
});
