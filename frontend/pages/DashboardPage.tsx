import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Settings, Star, Eye, MessageCircle, Crown } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Acesso negado
          </h1>
          <p className="text-gray-600">
            Você precisa estar logado para acessar o dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Bem-vindo, {user.profile?.firstName || user.email}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* User Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Informações da Conta</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Plano:</span>
                <Badge
                  variant={user.role === "premium" ? "default" : "secondary"}
                  className={user.role === "premium" ? "bg-yellow-100 text-yellow-800" : ""}
                >
                  {user.role === "admin" && <Crown className="h-3 w-3 mr-1" />}
                  {user.role === "admin" ? "Administrador" : 
                   user.role === "premium" ? "Premium" : "Básico"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Views */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações do Perfil</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Não lidas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Gerenciar Avaliações
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Ver Mensagens
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upgrade para Premium</CardTitle>
          </CardHeader>
          <CardContent>
            {user.role === "basic" ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Desbloqueie recursos premium para aumentar sua visibilidade:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Botões de ação personalizáveis</li>
                  <li>• Destaque nos resultados de busca</li>
                  <li>• Galeria de casos ilimitada</li>
                  <li>• Estatísticas detalhadas</li>
                </ul>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Crown className="h-4 w-4 mr-2" />
                  Fazer Upgrade
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-gray-600">
                  Você já tem acesso a todos os recursos premium!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
