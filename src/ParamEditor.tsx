import React from 'react';

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  colorId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

type StateValue = {
  [key: number]: string;
};

interface State {
  paramValues: StateValue;
}

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const initialValues = props.model.paramValues.reduce((acc, paramValue) => {
      acc[paramValue.paramId] = paramValue.value;

      return acc;
    }, {} as { [key: number]: string });

    this.state = {
      paramValues: initialValues,
    };
  }

  public getModel(): Model {
    const { paramValues } = this.state;
    const paramValuesArray = Object.entries(paramValues).map(([paramId, value]) => ({
      paramId: Number(paramId),
      value,
    }));

    return {
      paramValues: paramValuesArray,
      colors: [], // Если необходимо, можно добавить логику для работы с цветами
    };
  }

  private handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  render(): React.ReactNode {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div className='flex h-screen flex-col items-center justify-center gap-1.5'>
        <h1 className='text-center mb-14'>Тестовое для Selsup</h1>
        <div>
          <div className='grid gap-y-3'>
            {params.map((param) => (
              <div key={param.id}>
                <label className='grid grid-cols-3 gap-x-2'>
                  <span>{param.name}:</span>
                  <input
                    type={param.type}
                    value={paramValues[param.id] || ''}
                    onChange={(e) => this.handleChange(param.id, e.target.value)}
                    className='col-span-2 border rounded-sm p-1 border-gray-400'
                  />
                </label>
              </div>
            ))}
          </div>

          <div className='mt-8 mb-2'>Текущие значения:</div>
          <RenderData params={params} paramValues={paramValues} />
        </div>
      </div>
    );
  }
}

interface RenderDataProps {
  params: Param[];
  paramValues: StateValue;
}

export class RenderData extends React.Component<RenderDataProps> {
  render(): React.ReactNode {
    const { params, paramValues } = this.props;

    return (
      <div>
        <ul>
          {params.map((param) => (
            <li key={param.id}>{`${param.name}: ${paramValues[param.id] || ''}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}
