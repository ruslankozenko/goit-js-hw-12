import{a as L,S as E,i as n}from"./assets/vendor-tnUJPedx.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const w="47281982-63a34c7367b72af3cb7b29a97",v="https://pixabay.com/api/";async function g(t,s,r=15){const l={key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:r};try{return(await L.get(v,{params:l})).data}catch(e){throw console.error("Error fetching images:",e),e}}const m=document.querySelector(".gallery"),S=new E(".gallery a",{captionsData:"alt",captionDelay:250});function y(t){const s=t.map(r=>`<li class="gallery-item">
  <a class="gallery-link" href="${r.largeImageURL}">
    <img
      src="${r.webformatURL}"
      alt="${r.tags}"
    />
    <ul class="img-dscr">
      <li><p><b>Likes</b> ${r.likes}</p></li>
      <li><p><b>Views</b> ${r.views}</p></li>
      <li><p><b>Comments</b> ${r.comments}</p></li>
      <li><p><b>Downloads</b> ${r.downloads}</p></li>
    </ul>
  </a>
</li>`).join("");m.insertAdjacentHTML("beforeend",s),S.refresh()}const P=document.querySelector(".form"),q=document.querySelector("input"),h=document.querySelector(".loader"),f=document.querySelector(".load-btn");let a=1,c="";const p=15;let d=0;function i(t=!1,s=!1){t?f.classList.add("is-open"):f.classList.remove("is-open"),s?h.classList.add("is-open"):h.classList.remove("is-open")}function R(){const{height:t}=m.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function b(){a*p>=d&&(i(!1,!1),n.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"center",timeout:3e3}))}P.addEventListener("submit",async t=>{if(t.preventDefault(),m.innerHTML="",i(!1,!0),c=q.value.trim(),a=1,c==="")return i(!1,!1),n.warning({title:"Caution",message:"Please complete the field!",position:"center",timeout:2e3});try{const s=await g(c,a,p);if(d=s.totalHits,s.hits.length===0)return i(!1,!1),n.info({title:"Sorry",message:"There are no images matching your search query. Please try again!",position:"center",timeout:2e3});y(s.hits),i(!0,!1),n.success({title:"Success",message:`Found ${d} images!`,position:"center",timeout:2e3}),b()}catch{i(!1,!1),n.error({title:"Error",message:"There was an error fetching the images.",position:"center",timeout:2e3})}});f.addEventListener("click",async()=>{i(!1,!0),a+=1;try{const t=await g(c,a,p);if(t.hits.length===0)return i(!1,!1),n.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results.",position:"center",timeout:3e3});y(t.hits),i(!0,!1),R(),b()}catch{i(!1,!1),n.error({title:"Error",message:"Failed to load more images.",position:"center",timeout:2e3})}});
//# sourceMappingURL=index.js.map