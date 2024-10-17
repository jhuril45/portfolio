import Parse from "parse/dist/parse.min.js";
const ParseObj = Parse;

ParseObj.initialize(
  "YEnVZ9R0c1XmGXiXnbRkC8Lb5RXeLz8SAHK6SIjr",
  "ciuz1dpWOyfUMYfylWlEi9JaThqFlHIf2iRBsI56"
);

ParseObj.serverURL = "https://parseapi.back4app.com/";

class ParseDB {
  createClass(name, content) {
    var MyClass = ParseObj.Object.extend(name);
    var object = new MyClass();
    return object.save(content);
  }

  clearCache() {
    return ParseObj.User._clearCache();
  }

  logOutUser() {
    return ParseObj.User.logOut();
  }

  user() {
    return ParseObj.User;
  }

  object() {
    return ParseObj;
  }

  file(name, file, type) {
    return new ParseObj.File(name, file, type);
  }

  parseQuery(name) {
    var data = ParseObj.Object.extend(name);
    var query = new ParseObj.Query(data);
    return query;
  }

  parseClass(name) {
    return ParseObj.Object.extend(name);
  }

  find(className, val, key = "cryptoId") {
    try {
      var query = new ParseObj.Query(className);
      if (val) {
        query.equalTo(key, val);
      }
      query.descending("createdAt");
      return query.find();
    } catch (error) {
      console.log(error);
    }
  }
  filter(className, filter, limit = 10) {
    var query = new ParseObj.Query(className);
    filter.forEach((f) => {
      query[f.func](f.column, f.value);
    });
    query.descending("positiveScore");
    query.limit(limit);
    return query.find();
  }
  destroy() {
    ParseObj.LiveQuery.close();
  }
  create(objectName, data) {
    var NewObject = ParseObj.Object.extend(objectName);
    let newObject = new NewObject();
    for (let i in data) {
      newObject.set(i, data[i]);
    }
    return newObject.save();
  }
  createUseACLObject(
    objectName,
    data,
    permission = {
      read: true,
      write: false,
    }
  ) {
    var acl = new ParseObj.ACL();
    var NewObject = ParseObj.Object.extend(objectName);
    let newObject = new NewObject();
    for (let i in data) {
      newObject.set(i, data[i]);
    }
    if (permission.read) {
      acl.setReadAccess(ParseObj.User.current(), true);
    }

    if (permission.write) {
      acl.setWriteAccess(ParseObj.User.current(), true);
    }

    newObject.setACL(acl);
    return newObject.save();
  }
}

export { ParseObj, ParseDB };
