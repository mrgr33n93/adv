import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import backend from "~backend/client";
import LawyerCard from "../components/LawyerCard";
import SearchFilters from "../components/SearchFilters";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LawyersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [cityId, setCityId] = useState(searchParams.get("cityId") || "");
  const [specialtyId, setSpecialtyId] = useState(searchParams.get("specialtyId") || "");
  const [minRating, setMinRating] = useState(searchParams.get("minRating") || "");
  const [minExperience, setMinExperience] = useState(searchParams.get("minExperience") || "");
  const [isPremium, setIsPremium] = useState(searchParams.get("isPremium") || "");
  const [page, setPage] = useState(1);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (cityId) params.set("cityId", cityId);
    if (specialtyId) params.set("specialtyId", specialtyId);
    if (minRating) params.set("minRating", minRating);
    if (minExperience) params.set("minExperience", minExperience);
    if (isPremium) params.set("isPremium", isPremium);
    
    setSearchParams(params);
    setPage(1); // Reset to first page when filters change
  }, [search, cityId, specialtyId, minRating, minExperience, isPremium, setSearchParams]);

  // Fetch cities
  const { data: citiesData } = useQuery({
    queryKey: ["cities"],
    queryFn: () => backend.lawyers.getCities(),
  });

  // Fetch specialties
  const { data: specialtiesData } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => backend.lawyers.getSpecialties(),
  });

  // Fetch lawyers
  const { data: lawyersData, isLoading, error } = useQuery({
    queryKey: ["lawyers", {
      page,
      search,
      cityId: cityId ? Number(cityId) : undefined,
      specialtyId: specialtyId ? Number(specialtyId) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
      minExperience: minExperience ? Number(minExperience) : undefined,
      isPremium: isPremium ? isPremium === "true" : undefined,
    }],
    queryFn: () => backend.lawyers.listLawyers({
      page,
      limit: 12,
      search: search || undefined,
      cityId: cityId ? Number(cityId) : undefined,
      specialtyId: specialtyId ? Number(specialtyId) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
      minExperience: minExperience ? Number(minExperience) : undefined,
      isPremium: isPremium ? isPremium === "true" : undefined,
    }),
  });

  const handleClearFilters = () => {
    setSearch("");
    setCityId("");
    setSpecialtyId("");
    setMinRating("");
    setMinExperience("");
    setIsPremium("");
  };

  const activeFiltersCount = [search, cityId, specialtyId, minRating, minExperience, isPremium]
    .filter(Boolean).length;

  const cities = citiesData?.cities || [];
  const specialties = specialtiesData?.specialties || [];
  const lawyers = lawyersData?.lawyers || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Advogados em Mato Grosso
        </h1>
        <p className="text-gray-600">
          {lawyersData ? `${lawyersData.total} profissionais encontrados` : "Carregando..."}
        </p>
      </div>

      <SearchFilters
        search={search}
        onSearchChange={setSearch}
        cityId={cityId}
        onCityChange={setCityId}
        specialtyId={specialtyId}
        onSpecialtyChange={setSpecialtyId}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        minExperience={minExperience}
        onMinExperienceChange={setMinExperience}
        isPremium={isPremium}
        onIsPremiumChange={setIsPremium}
        cities={cities}
        specialties={specialties}
        onClearFilters={handleClearFilters}
        activeFiltersCount={activeFiltersCount}
      />

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">Erro ao carregar advogados. Tente novamente.</p>
        </div>
      )}

      {!isLoading && !error && lawyers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            Nenhum advogado encontrado com os filtros selecionados.
          </p>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="mt-4"
          >
            Limpar filtros
          </Button>
        </div>
      )}

      {!isLoading && !error && lawyers.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {lawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>

          {lawyersData && lawyersData.totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, lawyersData.totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page === lawyersData.totalPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
