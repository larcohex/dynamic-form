export default function useInput(emit) {
  const setValue = (value, modelName = "modelValue") => {
    emit(`update:${modelName}`, value);
  };
  const emitBlur = () => {
    emit("blur");
  };
  return { setValue, emitBlur };
}
