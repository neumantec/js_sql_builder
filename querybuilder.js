function sqlBuilder(t) {
    this.queryType = "";
    this.query = "";
    if(t){
        if(t.table) {
            this.table = t.table;
        }
        else
        {
            throw "table not provided";
        }
    }
    else
    {
        throw "table not provided";
    }
    
    this.conditions = [];
}


sqlBuilder.prototype.get = function(j =[]) {
    this.queryType = "SELECT";
    this.query = "SELECT ";
    if(j.length == 0) {
        this.query += "* ";
    }
    else {
        for(i in j) {
            if(i == 0) {
                this.query += j[i];
            }
            else {
                this.query += "," + j[i];
            }
        }
    }
    this.query += " FROM " + this.table;
    return this;
}

sqlBuilder.prototype.insert = function(items) {
    this.queryType = "INSERT";
    
    this.query = "INSERT INTO " + this.table + " ";
    this.keys = "(";
    this.values = "(";
    for(i in items) {
        this.keys += i + ",";
        this.values += "'" + items[i] + "',";
    }
    this.keys = this.keys.slice(0, -1) + ")";
    this.values = this.values.slice(0, -1) + ")";
    return this;
};


sqlBuilder.prototype.update = function(s) {
    this.queryType = "UPDATE";
    
    this.query = "UPDATE " + this.table + " SET ";
    
    for( i in s ) {
        this.query += i +"='" + s[i] +"',";
    }
    this.query = this.query.slice(0, -1);
    return this;
}


sqlBuilder.prototype.where = function(key, val, op="=") {
    this.conditions.push({
        key:key,
        value:val,
        op:op
    });
    return this;
}

sqlBuilder.prototype.and = function() {
    this.conditions.push("AND");
    return this;
}

sqlBuilder.prototype.or = function() {
    this.conditions.push("OR");
    return this;
}



sqlBuilder.prototype.build = function() {
    if(this.queryType == "SELECT") {
        if(this.conditions.length>0) {
            var where = " WHERE ";
            
            for( i in this.conditions) {
                if(typeof(this.conditions[i]) == "object" ) {
                    where += this.conditions[i].key + " " + this.conditions[i].op + " '" + this.conditions[i].value + "' ";
                }
                else {
                    where += this.conditions[i] + " ";
                }
            }
            this.query += where;
        }
    }
    else if(this.queryType == "INSERT") {
        this.query += this.keys + " VALUES " + this.values;
    }
    else if(this.queryType == "UPDATE") {
        if(this.conditions.length>0) {
            var where = " WHERE ";
            
            for( i in this.conditions) {
                if(typeof(this.conditions[i]) == "object" ) {
                    where += this.conditions[i].key + " " + this.conditions[i].op + " '" + this.conditions[i].value + "' ";
                }
                else {
                    where += this.conditions[i] + " ";
                }
            }
            this.query += where;
        }
    }
    return this;
}

sqlBuilder.prototype.exec = function() {
    
    
    //return Result
}

