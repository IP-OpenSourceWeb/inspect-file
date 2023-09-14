import { isAudio } from './is-audio';

describe('isAudio', () => {
  it('should work', () => {
    expect(isAudio()).toEqual('is-audio');
  });
});
