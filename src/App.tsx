import { ParamEditor } from './ParamEditor';

export function App() {
  const productsData = {
    params: [
      {
        id: 1,
        name: 'Назначение',
        type: 'text',
      },
      {
        id: 2,
        name: 'Длина',
        type: 'text',
      },
    ],
    model: {
      paramValues: [
        {
          paramId: 1,
          value: 'повседневное',
        },
        {
          paramId: 2,
          value: 'макси',
        },
      ],
      colors: [
        {
          colorId: 1,
          value: 'red',
        },
        {
          colorId: 2,
          value: 'green',
        },
      ],
    },
  };

  return <ParamEditor params={productsData.params} model={productsData.model} />;
}
