    var url=window.location.href,uri=window.location.toString(),
    rel=document.querySelector('link[rel="canonical"]').getAttribute('href'),
    fb1=url.substring(0,url.indexOf('?fbclid')),
    fb2=url.substring(0,url.indexOf('&fbclid')),
    gi1=url.substring(0,url.indexOf('?gidzl')),
    gi2=url.substring(0,url.indexOf('&gidzl')),
    m1=url.substring(0,url.indexOf('?m=1')),
    m2=url.substring(0,url.indexOf('&m=1'))
    if((uri.length-fb1.length)>0){window.history.replaceState({},document.title,fb1)}
    if((uri.length-fb2.length)>0){window.history.replaceState({},document.title,fb2)}
    if((uri.length-gi1.length)>0){window.history.replaceState({},document.title,gi1)}
    if((uri.length-gi2.length)>0){window.history.replaceState({},document.title,gi2)}
    function appendChildHead(name,type){
      if(type=='css'){
        var fileref=document.createElement('link')
        fileref.setAttribute('rel','stylesheet')
        fileref.setAttribute('href',name)
      }else if(type=='js'){
        var fileref=document.createElement('script')
        fileref.setAttribute('type','text/javascript')
        fileref.setAttribute('async','')
        fileref.setAttribute('src',name)
      }
      if(typeof fileref!='undefined'){document.getElementsByTagName('head')[0].appendChild(fileref)}
    }
    function appendChildBody(name,type){
      if(type=='js')var src=document.createElement('script');src.setAttribute('async','');src.setAttribute('src',name)
      if(typeof src!='undefined')document.getElementsByTagName('body')[0].appendChild(src)
    }
    function modal_open(e){
      e.preventDefault()
      var target='#'+$('.modal--target').attr('id')
      if($(this).is('a')){target=$(this).attr('href')
      }else{target=$(this).attr('data-target')}
      $(target).show()
      $(target).find('.modal--confirm').fadeIn('slow',function(){$(this).addClass('show')})
      $('.modal--close').click(function(){
        var $this=$(this)
        $this.parents('.modal--confirm').removeClass('show')
        setTimeout(function(){$this.parents('.modal--target').removeAttr('style')},200)
      })
      $(document).on('keyup',function(k){
        if(k.keyCode==27){
          target=$('.modal--confirm.show')
          var parent=$(target).parent()
          setTimeout(function(){$(target).remove()},200)    
        }
      })
    }
    function submit_form(){
      var $this=$(this)
      $this.addClass('processing')
      $this.find('.background-overlay').removeClass('hidden')
      function one(callback){setTimeout(function(){$this.removeClass('processing').addClass('success');callback()},4000)}
      function two(){
        setTimeout(function(){
          $this.removeClass('success')
          $this.find('.background-overlay').addClass('hidden')
          $this[0].reset()
          $this.find('.required').removeClass('required')
          console.clear()
        },4000)
      }
      one(two)
    }
    window.addEventListener('DOMContentLoaded',function(){
      if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone|webOS)/i)===null
      ||window.navigator.pointerEnabled&&navigator.maxTouchPoints>1){
        document.documentElement.setAttribute('data-view-type','desktop')
        if((uri.length-m1.length)>0){window.history.replaceState({},document.title,m1)}
        if((uri.length-m2.length)>0){window.history.replaceState({},document.title,m2)}
        var _a=document.querySelectorAll('a')
        for(var i=0;i<_a.length;i++){
          var _b=_a[i].getAttribute('href')
          if(_b!=null){
            if(_b.indexOf('?m=1')!=-1)_a[i].setAttribute('href',_b.substr(0,_b.indexOf('?m=1')))
            if(_b.indexOf('&m=1')!=-1)_a[i].setAttribute('href',_b.substr(0,_b.indexOf('&m=1')))
          }
        }
      }else{document.documentElement.setAttribute('data-view-type','mobile')}
      $(document).off('click','.modal--open',modal_open).on('click','.modal--open',modal_open)
      $('form[name="contact_form"]').on('submit',submit_form)
      const header=document.querySelector('header.header'),
        menu=document.querySelector('.menu'),
        title=document.querySelectorAll('.menu .title:not(.home)'),
        button=document.querySelector('.header button.open'),
        input=document.querySelector('.web-search input'),
        reset=document.querySelector('.web-search .reset'),
        overlay=document.querySelector('.overlay'),
        elems=document.querySelectorAll('header.header,.overlay,body'),
        close=document.querySelectorAll('.menu .home,.overlay'),
        search=document.querySelector('.header-search-icon>a'),
        page=document.querySelector('.header-page-icon>a')
      if(window.matchMedia('(max-width:860px)').matches){for(var i=0;i<title.length;i++)title[i].classList.add('has-sub')}
      window.addEventListener('resize',function(){
        if(this.matchMedia('(max-width:860px)').matches){
          for(var i=0;i<title.length;i++){
            title[i].classList.add('has-sub')
            title[i].addEventListener('click',function(){this.classList.toggle('has-toggle')})
          }
        }else{
          if(!menu.classList.contains('section'))menu.classList.add('section')
          if(!overlay.classList.contains('hidden'))overlay.classList.add('hidden')
          for(var i=0;i<title.length;i++)title[i].classList.remove('has-sub')
        }
      })
      for(var i=0;i<title.length;i++){
        if(title[i].classList.contains('has-sub')){title[i].addEventListener('click',function(){this.classList.toggle('has-toggle')})}
      }
      button.addEventListener('click',function(e){
        e.stopPropagation()
        button.setAttribute('aria-expanded','true')
        button.setAttribute('aria-pressed','true')
        overlay.classList.remove('hidden')
        menu.classList.remove('section')
      })
      for(var i=0;i<close.length;i++){
        close[i].addEventListener('click',function(){
          button.setAttribute('aria-expanded','false')
          button.setAttribute('aria-pressed','false')
          overlay.classList.add('hidden')
          menu.classList.add('section')
        })
      }
      menu.addEventListener('click',function(e){e.stopPropagation()})
      input.addEventListener('keyup',function(){reset.classList.remove('hidden')})
      reset.addEventListener('click',function(e){reset.classList.add('hidden')})
      $(search).click(function(){
        $(this).attr('aria-expanded',function(i,attr){return attr=='true'?'false':'true'})
        $(this).attr('aria-pressed',function(i,attr){return attr=='true'?'false':'true'})
        $('.web-search').attr('aria-hidden',function(i,attr){return attr=='true'?'false':'true'})
        $('.header+div').attr('expanded',function(i,attr){return attr=='true'?'false':'true'})
        $('.web-search input[type=search]').focus()
      })
      if(data.view.isSearchQuery=='true'){
        $(search).attr({'aria-expanded':'true','aria-pressed':'true'})
        $('.header+div').attr('expanded','true')
      }
      $(page).click(function(e){
        e.stopPropagation()
        $(this).attr('aria-expanded',function(i,attr){return attr=='true'?'false':'true'})
        $(this).attr('aria-pressed',function(i,attr){return attr=='true'?'false':'true'})
        $('.page-list .widget-content').toggleClass('opened')
        $('.page-list .widget-content').attr('aria-hidden',function(i,attr){return attr=='true'?'false':'true'})
      })
      $('html,.header .open,.web-search,.menu').click(function(){
        $('.header-page-icon>a').attr({'aria-expanded':'false','aria-pressed':'false'})
        $('.page-list .widget-content').removeClass('opened').attr('aria-hidden','true')
      })
      var load_random=0
      function get_random(){
        if(load_random==0){
          load_random=1
          $.get('/search?max-results='+data.blog.searchindex,function(e){
            var a=$(e).find('.Blog .post'),p=''
            if(a.length){
              var b=a.length,r=12,c=document.querySelector('.RandomPosts>.widget-content')
              if(a.length<r) r=a.length
              let arr=[]
              do{let num=Math.floor(Math.random()*b)
                arr.push(num)
                arr=arr.filter((item,index)=>{return arr.indexOf(item)===index})
              }while(arr.length<r)
              arr.forEach(function(i){
                p+='<article class="post data-article" data-article-id='+$(a[i]).attr('data-article-id')+'>'
                p+=$(a[i]).html()
                p+='</article>'
                c.classList.remove('loading')
                c.innerHTML=p
              })
            }else{$('.RandomPosts').remove()}
          })
        }
      }window.addEventListener('scroll',function(){get_random()})
    })