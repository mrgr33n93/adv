import React from "react";
import { Search, MapPin, Scale, Star, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  cityId: string;
  onCityChange: (value: string) => void;
  specialtyId: string;
  onSpecialtyChange: (value: string) => void;
  minRating: string;
  onMinRatingChange: (value: string) => void;
  minExperience: string;
  onMinExperienceChange: (value: string) => void;
  isPremium: string;
  onIsPremiumChange: (value: string) => void;
  cities: Array<{ id: number; name: string }>;
  specialties: Array<{ id: number; name: string }>;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export default function SearchFilters({
  search,
  onSearchChange,
  cityId,
  onCityChange,
  specialtyId,
  onSpecialtyChange,
  minRating,
  onMinRatingChange,
  minExperience,
  onMinExperienceChange,
  isPremium,
  onIsPremiumChange,
  cities,
  specialties,
  onClearFilters,
  activeFiltersCount,
}: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome, OAB ou especialidade..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Select value={cityId} onValueChange={onCityChange}>
            <SelectTrigger>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Cidade" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as cidades</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={specialtyId} onValueChange={onSpecialtyChange}>
            <SelectTrigger>
              <div className="flex items-center space-x-2">
                <Scale className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Especialidade" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as especialidades</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty.id} value={specialty.id.toString()}>
                  {specialty.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={minRating} onValueChange={onMinRatingChange}>
            <SelectTrigger>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Avaliação mínima" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Qualquer avaliação</SelectItem>
              <SelectItem value="4">4+ estrelas</SelectItem>
              <SelectItem value="4.5">4.5+ estrelas</SelectItem>
              <SelectItem value="5">5 estrelas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={minExperience} onValueChange={onMinExperienceChange}>
            <SelectTrigger>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Experiência mínima" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Qualquer experiência</SelectItem>
              <SelectItem value="1">1+ anos</SelectItem>
              <SelectItem value="5">5+ anos</SelectItem>
              <SelectItem value="10">10+ anos</SelectItem>
              <SelectItem value="15">15+ anos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={isPremium} onValueChange={onIsPremiumChange}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os planos</SelectItem>
              <SelectItem value="true">Apenas Premium</SelectItem>
              <SelectItem value="false">Apenas Básico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""} ativo{activeFiltersCount > 1 ? "s" : ""}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
