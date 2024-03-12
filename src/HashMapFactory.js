import HashNodeFactory from './HashNodeFactory.js';

function HashMapFactory() {
  let buckets = new Array(17);
  let size = 0;

  function incrementSize() {
    size += 1;
  }

  function decrementSize() {
    size -= 1;
  }

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= buckets.length;
    }

    return hashCode;
  }

  function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }

  function nextPrime(n) {
    let prime = n;
    let found = false;

    while (!found) {
      prime += 1;
      if (isPrime(prime)) found = true;
    }

    return prime;
  }

  function isLoadFactorValid() {
    return size / buckets.length < 0.75;
  }

  function rehash() {
    const newSize = nextPrime(buckets.length * 2);
    const tmpArray = buckets;
    buckets = new Array(newSize);
    size = 0;

    for (let i = 0; i < tmpArray.length; i += 1) {
      if (tmpArray[i] !== undefined) {
        let tmpNode = tmpArray[i];
        while (tmpNode !== null) {
          set(tmpNode.key, tmpNode.value);
          tmpNode = tmpNode.nextNode;
        }
      }
    }
  }

  function set(key, value) {
    const index = hash(key);

    if (buckets[index] === undefined) {
      buckets[index] = HashNodeFactory(key, value, null);
      incrementSize();
    } else {
      let tmp = buckets[index];
      while (tmp !== null) {
        if (tmp.key.localeCompare(key) === 0) {
          tmp.value = value;
          break;
        }

        if (tmp.nextNode === null) {
          tmp.nextNode = HashNodeFactory(key, value, null);
          incrementSize();
          break;
        }

        tmp = tmp.nextNode;
      }
    }

    if (!isLoadFactorValid()) {
      rehash();
    }
  }

  function get(key) {
    const index = hash(key);
    let tmpNode = buckets[index];
    if (tmpNode === undefined) return null;
    while (tmpNode !== null) {
      if (tmpNode.key.localeCompare(key) === 0) return tmpNode.value;
      tmpNode = tmpNode.nextNode;
    }
    return null;
  }

  function has(key) {
    const index = hash(key);
    let tmpNode = buckets[index];
    if (tmpNode === undefined) return false;
    while (tmpNode !== null) {
      if (tmpNode.key.localeCompare(key) === 0) return true;
      tmpNode = tmpNode.nextNode;
    }
    return false;
  }

  function remove(key) {
    const index = hash(key);
    let tmpNode = buckets[index];
    if (tmpNode === undefined) return false;
    let prevNode = null;
    while (tmpNode !== null) {
      if (tmpNode.key.localeCompare(key) === 0) {
        if (prevNode === null && tmpNode.nextNode !== null)
          buckets[index] = tmpNode.nextNode;
        else if (prevNode === null) buckets[index] = undefined;
        else prevNode.nextNode = tmpNode.nextNode;
        decrementSize();
        return true;
      }
      prevNode = tmpNode;
      tmpNode = tmpNode.nextNode;
    }

    return false;
  }

  function keys() {
    const keyArray = [];
    buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        let tmpNode = bucket;
        while (tmpNode !== null) {
          keyArray.push(tmpNode.key);
          tmpNode = tmpNode.nextNode;
        }
      }
    });

    return keyArray;
  }

  function values() {
    const valueArray = [];
    buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        let tmpNode = bucket;
        while (tmpNode !== null) {
          valueArray.push(tmpNode.value);
          tmpNode = tmpNode.nextNode;
        }
      }
    });

    return valueArray;
  }

  function entries() {
    const entryArray = [];
    buckets.forEach((bucket) => {
      if (bucket !== undefined) {
        let tmpNode = bucket;
        while (tmpNode !== null) {
          const { key } = tmpNode;
          const { value } = tmpNode;
          entryArray.push({ key, value });
          tmpNode = tmpNode.nextNode;
        }
      }
    });

    return entryArray;
  }

  function length() {
    return size;
  }

  function clear() {
    for (let i = 0; i < buckets.length; i += 1) buckets[i] = undefined;
    size = 0;
  }

  return {
    hash,
    set,
    get,
    has,
    remove,
    keys,
    values,
    entries,
    length,
    clear,
  };
}

export default HashMapFactory;
