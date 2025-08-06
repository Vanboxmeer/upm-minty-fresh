const TrustedBy = () => {
  const companies = ["Forbes", "MarketWatch", "Inc.", "Bankless", "Investing.com", "NASDAQ", "TechCrunch", "Business Wire", "Yahoo Finance", "Cointelegraph"];
  return <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted by <span className="text-primary">Web3</span> Digital Marketing Teams
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60">
          {companies.map((company, index) => <div key={index} className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              {company}
            </div>)}
        </div>
      </div>
    </section>;
};
export default TrustedBy;