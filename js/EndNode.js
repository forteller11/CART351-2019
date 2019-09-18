'use strict';


class EndNode extends Node
{
  constructor (url)
  {
    this.name = name;
    this.url = url;
  }

  select(){
    //open url
    window.open(url, '_blank');
  }
}
