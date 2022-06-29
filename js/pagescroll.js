    var pages={
      num:{posts:15,pages:5},element:{id:'#blog-pager',parent:'.Blog .post',child:'.post_date'},messages:{page:'Trang',nextpage:'Trang kế',prevpage:'Trang trước'}
    },serviceUrl=''
    if([data.view.isHomepage,data.view.isSearch].includes('true'))serviceUrl='/search?max-results='+data.blog.searchindex
    else if(data.view.isLabelSearch=='true')serviceUrl='/search/label/'+data.blog.pageName+'?max-results='+data.blog.searchindex
    else if(data.view.isSearchQuery=='true')serviceUrl='/search?q='+data.blog.searchqueryescaped+'&max-results='+data.blog.searchindex
    var is_load=0
    function loadjs(){
      if(is_load==0){
        is_load=1
        $.get(serviceUrl,function(e){
          var a=$(e).find(pages.element.parent)
          if(a.length){
            var d='',m='',n='',html='',q=0,s=0,t=1,page_start=0,page_end=0,
            b=Math.ceil(a.length/10)
            if(url.indexOf('&page=')!=-1){
              var u=url.substring(url.indexOf('&page=')+6,url.length),j=Number(u)
              if(!isNaN(j)){n=u
              }else if(u.indexOf('&')!=-1){n=u.substring(0,u.indexOf('&'))
              }else if(u.indexOf('#')!=-1){n=u.substring(0,u.indexOf('#'))} 
            }else{n=1}
            var page_num=parseInt(pages.num.pages/2)
            if(page_num==pages.num.pages-page_num) pages.num.pages=page_num*2+1
            page_start=n-page_num
            if(page_start<1) page_start=1
            page_end=page_start+pages.num.pages-1
            if(page_end>b) page_end=b
            if(n>1){
              if(n==2){
                if(data.view.isSearch=='true'){
                  html+='<a class="page-number angle-left-icon has-svg-icon prev" href='+data.blog.homepageUrl+' rel="prev" title="'+data.messages.home+'"></a>'
                }else if(data.view.isLabelSearch=='true'){
                  html+='<a class="page-number angle-left-icon has-svg-icon prev" href="/search/label/'+data.blog.pageName+'?max-results='+pages.num.posts+'" rel="prev" title="'+pages.messages.prevpage+'"></a>'
                }else if(data.view.isSearchQuery=='true'){
                  html+='<a class="page-number angle-left-icon has-svg-icon prev" href="/search?q='+data.blog.searchqueryescaped+'&max-results='+pages.num.posts+'" rel="prev" title="'+pages.messages.prevpage+'"></a>'
                }
              }else{
                t=(n*pages.num.posts-1)-(pages.num.posts*2)
                d=$(a[t]).find(pages.element.child).attr('data-date')
                q=n-1
                s=(q*pages.num.posts)-pages.num.posts
                if(data.view.isSearch=='true'){
                  html+='<a class="page-number angle-left-icon has-svg-icon prev" href="/search?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+q+'" title="'+pages.messages.prevpage+'"></a>'
                }else if(data.view.isLabelSearch=='true'){
                  html+='<a class="page-number angle-left-icon has-svg-icon prev" href="/search/label/'+data.blog.pageName+'?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+q+'" title="'+pages.messages.prevpage+'"></a>'
                }else if(data.view.isSearchQuery=='true'){
                  html+='<a class="page-number angle-left-icon has-svg-icon prev" href="/search?q='+data.blog.searchqueryescaped+'?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+q+'" title="'+pages.messages.prevpage+'"></a>'
                }
              }
            }
            for(var g=page_start;g<=page_end;g++){
             s=(g-1)*pages.num.posts
             if(g==1&&n==1){
                if(data.view.isHomepage=='true'){
                  html+='<a class="page-number current" href='+data.blog.homepageUrl+' title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isSearch=='true'){
                  html+='<a class="page-number current" href='+data.blog.homepageUrl+' title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isLabelSearch=='true'){
                  html+='<a class="page-number current" href="/search/label/'+data.blog.pageName+'?max-results='+pages.num.posts+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isSearchQuery=='true'){
                  html+='<a class="page-number current" href="/search?q='+data.blog.searchqueryescaped+'&max-results='+pages.num.posts+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }
              }else if(g==1){
                if(data.view.isHomepage=='true'){
                  html+='<a class="page-number" href='+data.blog.homepageUrl+' title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isSearch=='true'){
                  html+='<a class="page-number" href='+data.blog.homepageUrl+' title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isLabelSearch=='true'){
                  html+='<a class="page-number" href="/search/label/'+data.blog.pageName+'?max-results='+pages.num.posts+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isSearchQuery=='true'){
                  html+='<a class="page-number" href="/search?q='+data.blog.searchqueryescaped+'&max-results='+pages.num.posts+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }
              }else if(g==n){
                var f=g-1
                t=(f*pages.num.posts-1)
                d=$(a[t]).find(pages.element.child).attr('data-date')
                if(data.view.isHomepage=='true'){
                  html+='<a class="page-number current" href="/search?updated-max='+d+'&start='+s+'&max-results='+pages.num.posts+'&page='+g+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isSearch=='true'){
                  html+='<a class="page-number current" href="/search?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+g+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isLabelSearch=='true'){
                  html+='<a class="page-number current" href="/search/label/'+data.blog.pageName+'?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+q+'" title="Trang '+g+'">'+g+'</a>'
                }else if(data.view.isSearchQuery=='true'){
                  html+='<a class="page-number current" href="/search?q='+data.blog.searchqueryescaped+'&updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+q+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }
              }else{
                var f=g-1
                t=(f*pages.num.posts-1)
                d=$(a[t]).find(pages.element.child).attr('data-date')
                if(data.view.isHomepage=='true'){
                  html+='<a class="page-number" href="/search?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+g+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isSearch=='true'){
                  html+='<a class="page-number" href="/search?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+g+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isLabelSearch=='true'){
                  html+='<a class="page-number" href="/search/label/'+data.blog.pageName+'?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+g+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }else if(data.view.isSearchQuery=='true'){
                  html+='<a class="page-number" href="/search?q='+data.blog.searchqueryescaped+'&updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+g+'" title="'+pages.messages.page+' '+g+'">'+g+'</a>'
                }
              }
            }
            if(n<b){
              q=parseInt(n)+1
              t=(n*pages.num.posts-1)
              s=(q*pages.num.posts)-pages.num.posts
              d=$(a[t]).find(pages.element.child).attr('data-date')
              if(data.view.isHomepage=='true'){
                html+='<a class="page-number angle-right-icon has-svg-icon next" href="/search?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+q+'" rel="next" title="'+pages.messages.nextpage+'"></a>'
              }else if(data.view.isSearch=='true'){
                html+='<a class="page-number angle-right-icon has-svg-icon next" href="/search?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+q+'" rel="next" title="'+pages.messages.nextpage+'"></a>'
              }else if(data.view.isLabelSearch=='true'){
                html+='<a class="page-number angle-right-icon has-svg-icon next" href="/search/label/'+data.blog.pageName+'?updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+q+'" rel="next" title="'+pages.messages.nextpage+'"></a>'
              }else if(data.view.isSearchQuery=='true'){
                html+='<a class="page-number angle-right-icon has-svg-icon next" href="/search?q='+data.blog.searchqueryescaped+'&updated-max='+d+'&max-results='+pages.num.posts+'&start='+s+'&page='+q+'" rel="next" title="'+pages.messages.nextpage+'"></a>'
              }
            }
            html+='<span>Tìm thấy '+a.length+' phim</span>'
            var page_=document.querySelector(pages.element.id)
            if(page_){page_.innerHTML=html}
          }
        })
      }
    }
    window.addEventListener('load',function(){window.addEventListener('scroll',function(){loadjs()})})