//index switching in order to garbage friendly, finns bara en jord

ArrayHelper = {
    removeById : function(id, list){
        removed = false;
        for( var i = 0; i < list.length; i++){
            if(removed){
                list[i-1] = list[i];
            }
            if(list[i].id === id){
                removed = true;
            }
        }
        if(removed){
            list.length--;
        }
    }
}

