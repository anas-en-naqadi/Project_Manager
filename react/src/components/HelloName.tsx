type Props = {
  name: string;
  extData: {
    age: number;
    country: string;
  };
};

type ArrayTest = {
  data: Props[];
};

type Func = {
  onHandleClick: () => void;
};

function HelloName({ data, onHandleClick }: ArrayTest & Func) {
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <h1>Hello {item.name}, From React</h1>
          <h3>Additional data</h3>
          <div>
            <p>Your Age: {item.extData.age}</p>
            <p>Your Country: {item.extData.country}</p>
          </div>
        </div>
      ))}
      <button onClick={onHandleClick}>Click Me</button>
    </>
  );
}

export default HelloName;
