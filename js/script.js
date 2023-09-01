
const loadData = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await res.json();
  const allData = data.data;
  displayListItem(allData);
}

const displayListItem = (allData) => {
  const listUlDiv = document.getElementById('listUlDiv');
  listUlDiv.textContent = "";
  allData.forEach(data => {
    const li = document.createElement('li');
    li.classList = `list-none`;

    li.innerHTML = `<a onclick="getId('${data?.category_id}')" class="cursor-pointer py-2 px-4 rounded-lg text-[#252525B3] text-lg bg-[#25252526] hover:bg-[#FF1F3D] active:bg-[#FF1F3D] hover:text-white focus:bg-[#FF1F3D] font-semibold duration-300">${data?.category}</a>`;
    listUlDiv.appendChild(li);

  });

}


const getId = async (id) => {
  isSpinner(true);
  const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${id}`);
  const data = await res.json();
  const cardData = data;
  viewAllCard(cardData);

}

const viewAllCard = (cardData) => {

  const cardContainer = document.getElementById('card-container-div');
  cardContainer.textContent = "";
  const errorDiv = document.getElementById('error-container');
  errorDiv.textContent = "";
  if (cardData.data.length === 0) {
    const div = document.createElement('div');
    div.innerHTML = `
        <img class="mx-auto mb-8" src="image/Icon.png" alt="Error">
        <p class="text-center text-[#171717] text-3xl font-bold ">Oops!! Sorry, There is no content here</p>
        `;
    errorDiv.appendChild(div);
  }
  cardData?.data.forEach(data => {
    console.log(data.others.views);
    const totalSeconds = `${data?.others?.posted_date}`;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const div = document.createElement('div');
    div.classList = `card card-compact w-auto bg-base-200 shadow-xl px-2`;

    div.innerHTML = `
        
                            <figure id="thumbnail" class="relative"><img class="h-56 px-2" src="${data?.thumbnail}" alt="Shoes" />
                            ${data?.others?.posted_date ? ` <div class="badge badge-neutral bg-black absolute bottom-2 right-4">${hours} hrs ${minutes} min ago</div>` : ""}
                            </figure>
                            
                            <div class="flex px-4 mt-6 items-center gap-8">
                                <div class="avatar">
                                    <div class="w-20 rounded-full">
                                      <img src="${data?.authors[0]?.profile_picture || "No Profile Picture"}"/>
                                      
                                    </div>
                                  </div>
                              <h2 class="card-title">${data?.title}</h2>
                            </div>
                            <div class="flex items-center justify-center gap-2 px-8 mb-4">
                                <h3 class="text-sm text-[#171717B3]">
                                ${data?.authors[0]?.profile_name || "No Name Found"}</h3>
                                ${data?.authors[0]?.verified ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#clip0_11_34)">
                                  <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                                  <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_11_34">
                                    <rect width="20" height="20" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>` : ""}
                                
                            </div>
                            <div class="text-center mb-4 text-sm text-[#171717B3]">
                                <p>${data?.others?.views} <span>views</span></p>
                            </div>
                       
        `;
    cardContainer.appendChild(div);
  });
  isSpinner(false);


}

const blog = (event) => {
  const btnText = event.innerText.toLowerCase();
  const text = 'Blog';
  if (btnText === text.toLowerCase()) {
    window.location = "blog.html";
    target = "_blank";
    done = 1;
  }
}
const isSpinner = (value) => {
  const spinnerDiv = document.getElementById('spinner-div');
  if (value) {
    spinnerDiv.classList.remove('hidden');
  } else {
    spinnerDiv.classList.add('hidden');
  }
}
loadData();