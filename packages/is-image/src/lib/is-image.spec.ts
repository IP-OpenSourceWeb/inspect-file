import { isImage } from './is-image';

describe('isImage', () => {
  it('should work', () => {
    expect(isImage()).toEqual('is-image');
  });
});
