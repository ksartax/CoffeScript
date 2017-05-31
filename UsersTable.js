(function() {
  var TableUsers, User, Users, table,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  User = (function() {
    function User(option) {
      this.id = option.id, this.imie = option.imie;
    }

    User.prototype.getId = function() {
      return this.id;
    };

    User.prototype.getImie = function() {
      return this.imie;
    };

    User.prototype.setImie = function(imie) {
      return this.imie = imie;
    };

    User.prototype.setId = function(id) {
      return this.id = id;
    };

    return User;

  })();

  Users = (function() {
    function Users(array) {
      this.array = array;
    }

    Users.prototype.addUser = function(user) {
      return this.array.push(user);
    };

    Users.prototype.getUser = function(id) {
      var user, _i, _len, _ref;
      _ref = this.array;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        user = _ref[_i];
        if (user.getId() === id) {
          return user;
        }
      }
    };

    Users.prototype.updateUser = function(user) {
      var i, user1, _i, _len, _ref, _results;
      _ref = this.array;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        user1 = _ref[i];
        if (user1.getId() === user.getId()) {
          _results.push(this.array[i] = user);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Users.prototype.removeUser = function(id) {
      return this.array = this.array.filter(function(user) {
        return user.getId() !== parseInt(id);
      });
    };

    Users.prototype.getUsers = function() {
      return this.array;
    };

    return Users;

  })();

  TableUsers = (function(_super) {
    __extends(TableUsers, _super);

    function TableUsers(array) {
      TableUsers.__super__.constructor.call(this, array);
    }

    TableUsers.prototype.addUserTr = function(user, refTableBody) {
      return $(refTableBody).append(("<tr class='tr-" + (user.getId()) + "'> <td>") + user.getId() + "</td> <td> " + user.getImie() + ("</td> <td> <button class='remove' attr-id=" + (user.getId()) + "> Kasuj </button> </td> </tr>"));
    };

    TableUsers.prototype.displayData = function(refTableBody) {
      return (function($) {
        return {
          prepareTableData: function(array) {
            var html, user, _i, _len;
            html = "";
            for (_i = 0, _len = array.length; _i < _len; _i++) {
              user = array[_i];
              html = html + ("<tr class='tr-" + (user.getId()) + "'> <td>") + user.getId() + "</td> <td> " + user.getImie() + ("</td> <td> <button class='remove' attr-id=" + (user.getId()) + "> Kasuj </button> </td> </tr>");
            }
            return $(refTableBody).append(html);
          }
        };
      })(jQuery);
    };

    return TableUsers;

  })(Users);

  table = new TableUsers([
    new User({
      id: 1,
      imie: "Kauba"
    }), new User({
      id: 2,
      imie: "Sedba"
    }), new User({
      id: 3,
      imie: "Bi"
    }), new User({
      id: 4,
      imie: "Si"
    }), new User({
      id: 5,
      imie: "Bra"
    }), new User({
      id: 6,
      imie: "Var"
    }), new User({
      id: 7,
      imie: "Far"
    })
  ]);

  table.displayData('#u-contain').prepareTableData(table.getUsers());

  (function($) {
    return $(document).ready(function() {
      $("body").on('click', '.remove', function(el) {
        var id;
        id = $(el.currentTarget).attr('attr-id');
        table.removeUser(id);
        return $(".tr-" + id).css('display', 'none');
      });
      return $($("form").find('button')).on('click', function(el) {
        var idLast, idNew, user;
        idLast = table.getUsers()[table.getUsers().length - 1].getId();
        idNew = idLast + 1;
        user = new User({
          id: idNew,
          imie: $($("form").find('input')).val()
        });
        table.addUser(user);
        return table.addUserTr(user, '#u-contain');
      });
    });
  })(jQuery);

}).call(this);
