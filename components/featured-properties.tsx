import PropertyCard from "./property-card";

export default function FeaturedProperties() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Destaques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <PropertyCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}