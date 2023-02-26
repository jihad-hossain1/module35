const loadPhones = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText = '';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }
    // display no phones found
    const noPhone = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.slug}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSpinner(false);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);
    
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none');
    }
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}


// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})

const loadPhoneDetails =async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
}

// loadPhones();