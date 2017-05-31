class User
  constructor: (option) ->
    {@id, @imie} = option

  getId : () ->
    return @id

  getImie : () ->
    return @imie

  setImie : (imie) ->
    @imie = imie

  setId : (id) ->
    @id = id


class Users
  constructor : (array) ->
    @array = array

  addUser : (user) ->
    @array.push(user);

  getUser : (id) ->
    for user in @array
      if user.getId() == id
        return user

  updateUser : (user) ->
    for user1, i in @array
      if user1.getId() == user.getId()
        @array[i] = user

  removeUser : (id) ->
    @array = @array.filter (user) -> user.getId() != parseInt(id)

  getUsers : () ->
    return @array


class TableUsers extends Users
  constructor : (array) ->
    super(array)

  addUserTr : (user, refTableBody) ->
    $(refTableBody).append( "<tr class='tr-#{user.getId()}'> <td>" + user.getId() + "</td> <td> " + user.getImie() + "</td> <td> <button class='remove' attr-id=#{user.getId()}> Kasuj </button> </td> </tr>" )

  displayData : (refTableBody) ->
    (($) ->

      prepareTableData : (array) ->
        html = ""
        for user in array
          html = html + "<tr class='tr-#{user.getId()}'> <td>" + user.getId() + "</td> <td> " + user.getImie() + "</td> <td> <button class='remove' attr-id=#{user.getId()}> Kasuj </button> </td> </tr>"
        $(refTableBody).append( html )

    ) jQuery

table = new TableUsers [
    new User {id : 1, imie : "Kauba"}
    new User {id : 2, imie : "Sedba"}
    new User {id : 3, imie : "Bi"}
    new User {id : 4, imie : "Si"}
    new User {id : 5, imie : "Bra"}
    new User {id : 6, imie : "Var"}
    new User {id : 7, imie : "Far"}
  ]

table.displayData('#u-contain').prepareTableData(table.getUsers())

(($) ->
  $(document).ready ->
    $("body").on 'click' , '.remove', (el) ->
      id = $(el.currentTarget).attr('attr-id')
      table.removeUser(id)
      $(".tr-#{id}").css('display','none')

    $($("form").find('button')).on 'click', (el) ->
      idLast = table.getUsers()[table.getUsers().length - 1].getId()
      idNew = idLast + 1
      user = new User({id : idNew, imie : $($("form").find('input')).val()})
      table.addUser(user)
      table.addUserTr(user, '#u-contain')

) jQuery
