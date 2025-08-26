import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  MapPin,
  Award,
  Globe,
  Linkedin,
  Instagram,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import backend from "~backend/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function LawyerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("sobre");

  const { data: lawyer, isLoading, error } = useQuery({
    queryKey: ["lawyer", id],
    queryFn: () => backend.lawyers.getLawyer({ id: Number(id) }),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Advogado não encontrado
          </h1>
          <p className="text-gray-600">
            O perfil que você está procurando não existe ou foi removido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex-shrink-0">
            {lawyer.profileImageUrl ? (
              <img
                src={lawyer.profileImageUrl}
                alt={lawyer.firmName || "Advogado"}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <Award className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {lawyer.firmName || `OAB ${lawyer.oabNumber}`}
              </h1>
              {lawyer.isPremium && (
                <Badge className="bg-yellow-100 text-yellow-800">Premium</Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>OAB {lawyer.oabNumber}</span>
              </div>

              {lawyer.rating > 0 && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{lawyer.rating.toFixed(1)}</span>
                  <span>({lawyer.totalReviews} avaliações)</span>
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
                <span>{lawyer.experienceYears} anos de experiência</span>
              </div>
            </div>

            {lawyer.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {lawyer.specialties.map((specialty) => (
                  <Badge key={specialty.id} variant="outline">
                    {specialty.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            {lawyer.isPremium && lawyer.whatsappNumber && (
              <Button className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            )}
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Enviar Mensagem
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
              <TabsTrigger value="casos">Casos</TabsTrigger>
              <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
            </TabsList>

            <TabsContent value="sobre" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o Profissional</CardTitle>
                </CardHeader>
                <CardContent>
                  {lawyer.bio ? (
                    <p className="text-gray-700 leading-relaxed">{lawyer.bio}</p>
                  ) : (
                    <p className="text-gray-500 italic">
                      Nenhuma descrição disponível.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="casos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Galeria de Casos</CardTitle>
                </CardHeader>
                <CardContent>
                  {lawyer.caseGallery.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lawyer.caseGallery.map((caseItem) => (
                        <div
                          key={caseItem.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          {caseItem.imageUrl && (
                            <img
                              src={caseItem.imageUrl}
                              alt={caseItem.title}
                              className="w-full h-32 object-cover rounded mb-3"
                            />
                          )}
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {caseItem.title}
                          </h3>
                          {caseItem.caseType && (
                            <Badge variant="outline" className="mb-2">
                              {caseItem.caseType}
                            </Badge>
                          )}
                          {caseItem.description && (
                            <p className="text-gray-600 text-sm mb-2">
                              {caseItem.description}
                            </p>
                          )}
                          {caseItem.resultSummary && (
                            <p className="text-green-600 text-sm font-medium">
                              {caseItem.resultSummary}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      Nenhum caso disponível na galeria.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="avaliacoes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações dos Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  {lawyer.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {lawyer.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {review.reviewerName}
                            </h4>
                            <div className="flex items-center space-x-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-gray-700">{review.comment}</p>
                          )}
                          <p className="text-gray-500 text-sm mt-2">
                            {new Date(review.createdAt).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      Nenhuma avaliação disponível.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lawyer.address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Endereço</p>
                    <p className="text-gray-900">{lawyer.address}</p>
                  </div>
                </div>
              )}

              {lawyer.whatsappNumber && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <p className="text-gray-900">{lawyer.whatsappNumber}</p>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                {lawyer.websiteUrl && (
                  <a
                    href={lawyer.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Website</span>
                  </a>
                )}

                {lawyer.linkedinUrl && (
                  <a
                    href={lawyer.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                )}

                {lawyer.instagramUrl && (
                  <a
                    href={lawyer.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Specialties */}
          <Card>
            <CardHeader>
              <CardTitle>Especialidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lawyer.specialties.map((specialty) => (
                  <div key={specialty.id}>
                    <h4 className="font-medium text-gray-900">{specialty.name}</h4>
                    {specialty.description && (
                      <p className="text-sm text-gray-600">{specialty.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
