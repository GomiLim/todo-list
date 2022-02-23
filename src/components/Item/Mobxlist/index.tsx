import React from 'react';
import { useObserver } from 'mobx-react';

import useStore from 'useStore';
import { MobxItem } from 'components';

const Mobxlist = () => {
  const {
    todo: { todoData }
  } = useStore();

  return useObserver(() => (
    <section>
      {todoData.map(v => (
        <MobxItem data={v} key={`todoData_${v.id}`} />
      ))}
    </section>
  ));
};

export default Mobxlist;
