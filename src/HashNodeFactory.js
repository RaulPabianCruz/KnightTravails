function HashNodeFactory(key = null, value = null, nextNode = null) {
  return { key, value, nextNode };
}

export default HashNodeFactory;
