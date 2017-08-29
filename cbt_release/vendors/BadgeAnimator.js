function BadgeTextAnimator(t){if(null==t)throw new Error("You must pass options to the BadgeTextAnimator");this._options={text:t.text,interval:null==t.interval?500:t.interval,repeat:null==t.repeat||t.repeat,size:null!=t.size&&t.size>0&&t.size<=6?t.size:6},this._intervalId=null,this._currentIndex=0}BadgeTextAnimator.prototype.animate=function(){var t=[""," ","  ","   ","    ","     ","      "];this._setBadgeText(t[this._options.size]),this._doAnimate(),this._intervalId=setInterval(function(){this._doAnimate()}.bind(this),this._options.interval)},BadgeTextAnimator.prototype.stop=function(){clearInterval(this._intervalId),this._intervalId=null,this._setBadgeText("")},BadgeTextAnimator.prototype._doAnimate=function(){var t,e,i=this._currentIndex,n=this._options.size,s=!1;if(this._currentIndex<this._options.size&&(n=this._currentIndex+1,s=!0,i=0),(t=this._options.text.substr(i,n)).length<this._options.size){e=this._options.size-t.length;for(var o=0;o<=e;o++)!0===s?t=" "+t:t+=" "}this._setBadgeText(t),this._currentIndex=this._currentIndex+1,this._currentIndex===this._options.text.length&&(!0===this._options.repeat?this._currentIndex=0:this.stop())},BadgeTextAnimator.prototype._setBadgeText=function(t){chrome.browserAction.setBadgeText({text:t})};