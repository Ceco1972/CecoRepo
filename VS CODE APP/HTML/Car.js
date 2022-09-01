var RealEstate = function(price, area, address, year)
{
    this.price = price;
    this.area = area;
    this.address = address;
    this.year = year;
}

RealEstate.prototype.greeting = function()
{
    if(this.year>2021)
    {
        console.log("This real estate is already sold!")
    } else
    {
        console.log("This real estate is up for buying.")
    }
}