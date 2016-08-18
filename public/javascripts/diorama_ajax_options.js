/*global $*/
/*global cookie*/

$.each( [ "put", "delete" ], function( i, method ) {
  $[ method ] = function( url, data, callback, type ) {
    if ( $.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }
    return $.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});

if(cookie.readCookie('bearerToken'))
{
 $.ajaxSetup({
    headers: {
        "Authorization": "Bearer " + cookie.readCookie('bearerToken')
    },
    cache: false
}); 
}