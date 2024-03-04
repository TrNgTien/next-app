import { RestPaths } from '@/common';
import { networkHelperInstance } from '@/helpers';

export const getPosts = async () => {
  const { data }: any = await networkHelperInstance.send({
    url: RestPaths.POST,
    method: 'GET',
  });

  return data;
};
