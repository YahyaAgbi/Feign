package exemple.eurekaclient.controller;

import exemple.eurekaclient.entities.Client;
import exemple.eurekaclient.repository.ClientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ClientController {

    private final ClientRepository clientRepository;

    public ClientController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @GetMapping("/clients")
    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    @GetMapping("/client/{id}")
    public Optional<Client> getClient(@PathVariable Long id) {
        return clientRepository.findById(id);
    }

    @PostMapping("/client")
    public Client saveClient(@RequestBody Client client){
        return clientRepository.save(client);
    }
    @PutMapping("client/{id}")
    public Client updateClient( @PathVariable Long id,@RequestBody Client client){
        Optional<Client> clientOptional = clientRepository.findById(id);
        if(clientOptional.isPresent()){
            Client clientToUpdate = clientOptional.get();
            clientToUpdate.setNom(client.getNom());
            clientToUpdate.setAge(client.getAge());
            return clientRepository.save(clientToUpdate);
        }
        return null;
    }
    @DeleteMapping("client/{id}")
    public void deleteClient(@PathVariable Long id){
        clientRepository.deleteById(id);
    }
}
