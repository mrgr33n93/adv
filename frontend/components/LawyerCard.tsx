import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { LawyerListItem } from "~backend/lawyers/list_lawyers";

interface LawyerCardProps {
  lawyer: LawyerListItem;
}

export default function LawyerCard({ lawyer }: LawyerCardProps) {
  const handleWhatsAppClick = () => {
    if (lawyer.whatsappNumber) {
      const cleanNumber = lawyer.whatsappNumber.replace(/\D/g, '');
      const message = encodeURIComponent(`Olá! Vi seu perfil no Advogados MT e gostaria de conversar sobre serviços jurídicos.`);
      window.open(`https://wa.me/55${cleanNumber}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {lawyer.profileImageUrl ? (
            <img
              src={lawyer.profileImageUrl}
              alt={lawyer.firmName || "Advogado"}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <Award className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {lawyer.firmName || `OAB ${lawyer.oabNumber}`}
            </h3>
            {lawyer.isPremium && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Premium
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            {lawyer.rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{lawyer.rating.toFixed(1)}</span>
                <span>({lawyer.totalReviews})</span>
              </div>
            )}
            
            {lawyer.city && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{lawyer.city.name}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span>{lawyer.experienceYears} anos</span>
            </div>
          </div>

          {lawyer.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {lawyer.specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty.id} variant="outline" className="text-xs">
                  {specialty.name}
                </Badge>
              ))}
              {lawyer.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{lawyer.specialties.length - 3}
                </Badge>
              )}
            </div>
          )}

          {lawyer.bio && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {lawyer.bio}
            </p>
          )}

          <div className="flex items-center justify-between">
            <Link to={`/advogados/${lawyer.id}`}>
              <Button variant="outline" size="sm">
                Ver Perfil
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </Link>

            {lawyer.isPremium && lawyer.whatsappNumber && (
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleWhatsAppClick}
              >
                WhatsApp
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
